import { saveWorkOrders } from "@/lib/data";
import { v4 as uuidv4 } from "uuid";

const seed = async () => {
    const sampleWorkOrders = [
        {
            id: uuidv4(),
            title: "Fix leaking pipe",
            description:
                "The kitchen pipe has a slow leak. Needs replacement.",
            priority: "Medium" as const,
            status: "Open" as const,
            updatedAt: new Date().toISOString(),
        },
        {
            id: uuidv4(),
            title: "Server room AC is faulty",
            description:
                "AC unit in server room is not cooling. Room is getting hot.",
            priority: "High" as const,
            status: "In Progress" as const,
            updatedAt: new Date().toISOString(),
        },
    ];

    await saveWorkOrders(sampleWorkOrders);
    console.log("*********** Sample work orders seeded. ***********");
};

seed().catch(console.error)
