import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { ethereumAddress } = req.body;

  try {
    // Fetch the user and related data
    const user = await prisma.user.findUnique({
      where: { ethereumAddress },
      select: {
        totalPoints: true,
        bridges: {
          select: { id: true, count: true, updatedAt: true },
        },
        interactions: {
          select: { id: true, updatedAt: true, count: true },
        },
        streaks: {
          select: { id: true, currentStreak: true, updatedAt: true },
        },
      },
    });

    console.log(user);

    let pointsToAdd = 50; // 50 points for bridging

    const today = new Date().toDateString();
    const lastInteractionDate = user.interactions[0]?.updatedAt.toDateString();
    console.log("Today:", today);
    console.log("Last interaction:", lastInteractionDate);
    // Handle daily interaction
    if (lastInteractionDate !== today) {
      console.log("Daily interaction!");
      pointsToAdd += 20; // 20 points for daily interaction
    }

    // Handle streaks
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let streak = user.streaks[0]?.currentStreak || 0;

    if (lastInteractionDate === yesterday.toDateString()) {
      streak += 1;
    } else if (lastInteractionDate !== today) {
      streak = 1; // Reset streak
    }

    // Update user points, bridge counter, interactions, and streaks
    const updateData: any = {
      totalPoints: user.totalPoints + pointsToAdd,
    };

    if (user.bridges.length) {
      updateData.bridges = {
        update: {
          where: { id: user.bridges[0].id },
          data: { updatedAt: new Date(), count: user.bridges[0].count + 1 },
        },
      };
    } else {
      updateData.bridges = {
        create: { updatedAt: new Date(), count: 1 },
      };
    }

    if (user.interactions.length) {
      updateData.interactions = {
        update: {
          where: { id: user.interactions[0].id },
          data: {
            updatedAt: new Date(),
            count: user.interactions[0].count + 1,
          },
        },
      };
    } else {
      updateData.interactions = {
        create: { updatedAt: new Date(), count: 1 },
      };
    }

    if (user.streaks.length) {
      updateData.streaks = {
        update: {
          where: { id: user.streaks[0].id },
          data: { currentStreak: streak, updatedAt: new Date() },
        },
      };
    } else {
      updateData.streaks = {
        create: {
          currentStreak: streak,
          updatedAt: new Date(),
          startDate: new Date(),
        },
      };
    }

    await prisma.user.update({
      where: { ethereumAddress },
      data: updateData,
    });

    console.log("Bridge recorded and points awarded");
    res.status(200).json({ message: "Bridge recorded and points awarded" });
  } catch (error) {
    console.error("Error in /api/bridge:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
}
