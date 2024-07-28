"use client";
import { useEffect } from "react";
import type { ErrorBoundary } from "@/app/static-types";
export default function FeatureFlagError({ error, reset }: ErrorBoundary) {
  useEffect(() => {
    // "{\"page_name\":\"live_detail\",\"enter_from\":\"live_detail\",\"time_from_origin\":492392,\"is_landing_page\":0,\"previous_page\":\"homepage_follow\",\"page_url\":\"https://www.tiktok.com/@ryantempletbh/live?enter_from_merge=homepage_follow&enter_method=top_window\",\"userAgent\":\"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36\",\"user_type_alias\":\"user\",\"domain_name\":\"www.tiktok.com\",\"page_path\":\"/@ryantempletbh/live\",\"request_page\":\"webapp\",\"clientVersionName\":\"live_v3\",\"is_non_personalized\":\"0\",\"data_collection_enabled\":1,\"action_type\":\"click\",\"room_id\":\"7395735018565684011\",\"anchor_id\":\"6816121274273498117\",\"enter_from_merge\":\"homepage_follow\",\"enter_method\":\"top_window\",\"live_lineup_type\":\"normal\",\"prediction_payload\":\"0,0,0,0,0,0,0,37,0,1,0,0,7,0,0,0,18,0,4.430000000000001,0,0,0,7,0,0,0,0,0,0,0,0,983.5299999999838,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,1,21,4,0,0,0,0\",\"event_index\":1721955779248}"
    console.error(error);
  }, [error]);
  return (
    <>
      <div>
        <h2>Something went wrong!</h2>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </>
  );
}
