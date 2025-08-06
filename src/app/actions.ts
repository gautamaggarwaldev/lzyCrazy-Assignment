"use server";

import { suggestListingDetails, type SuggestListingDetailsInput } from "@/ai/flows/suggest-listing-details";

export async function getAISuggestions(data: SuggestListingDetailsInput) {
    try {
        const result = await suggestListingDetails(data);
        return { success: true, data: result };
    } catch (error) {
        console.error("AI suggestion failed:", error);
        return { success: false, error: "Failed to get AI suggestions." };
    }
}
