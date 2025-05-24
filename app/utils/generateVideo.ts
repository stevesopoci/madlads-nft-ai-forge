// utils/generateVideo.ts

/**
 * Trigger a video generation job using Replicate's Minimax video model.
 * Handles async job polling and updates state on completion or error.
 */

type GenerateVideoParams = {
  id: string;
  prompt: string;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setVideoUrl: (url: string) => void;
};

export default async function generateVideo({
  id,
  prompt,
  setLoading,
  setError,
  setVideoUrl,
}: GenerateVideoParams): Promise<void> {
  setLoading(true);
  setError("");
  setVideoUrl("");

  try {
    const res = await fetch(
      "https://api.replicate.com/v1/models/minimax/video-01-live/predictions",
      {
        method: "POST",
        headers: {
          // 🚨 Replace this with your actual Replicate API key or inject securely
          Authorization: "Bearer YOUR_REPLICATE_API_KEY",
          "Content-Type": "application/json",
          Prefer: "wait",
        },
        body: JSON.stringify({
          input: {
            prompt: prompt || "laughing with red laser eyes",
            prompt_optimizer: true,
            first_frame_image: `https://madlads.s3.us-west-2.amazonaws.com/images/${id}.png`,
          },
        }),
      }
    );

    const prediction = await res.json();
    console.log("[Minimax] Initial Response:", prediction);

    if (prediction?.error) {
      throw new Error(prediction.error);
    }

    const predictionId = prediction.id;

    const poll = async () => {
      try {
        const pollRes = await fetch(
          `https://api.replicate.com/v1/predictions/${predictionId}`,
          {
            headers: {
              Authorization: "Bearer YOUR_REPLICATE_API_KEY",
              "Content-Type": "application/json",
            },
          }
        );
        const pollData = await pollRes.json();
        console.log("[Minimax] Polling status:", pollData.status);

        if (pollData.status === "succeeded") {
          setVideoUrl(pollData.output);
          setLoading(false);
        } else if (pollData.status === "failed") {
          setError("Video generation failed.");
          setLoading(false);
        } else {
          setTimeout(poll, 4000); // Retry in 4s
        }
      } catch (pollError: any) {
        console.error("[Minimax] Polling error:", pollError);
        setError("Polling error. Please try again.");
        setLoading(false);
      }
    };

    poll();
  } catch (err: any) {
    console.error("[Minimax] Generation error:", err);
    setError(err.message || "Something went wrong.");
    setLoading(false);
  }
}
