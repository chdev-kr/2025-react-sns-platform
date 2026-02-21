/**
 * 유튜브 URL에서 VIDEO_ID 추출
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtube.com/shorts/VIDEO_ID
 */
export function extractYoutubeVideoId(url: string): string | null {
  const patterns = [
    // youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    // youtu.be/VIDEO_ID
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    // youtube.com/embed/VIDEO_ID
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    // youtube.com/shorts/VIDEO_ID
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * 텍스트에서 모든 유튜브 URL을 찾아 VIDEO_ID 배열을 반환
 * 중복된 VIDEO_ID 제거
 */
export function extractAllYoutubeVideoIds(text: string): string[] {
  // URL 패턴 (http/https로 시작하는 유튜브 관련 URL, 쿼리 파라미터 포함)
  const urlPattern =
    /https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?[^\s]+|embed\/[^\s]+|shorts\/[^\s]+)|youtu\.be\/[^\s]+)/g;

  const urls = text.match(urlPattern);
  if (!urls || urls.length === 0) {
    return [];
  }

  // 모든 URL에서 VIDEO_ID 추출하고 중복 제거
  const videoIds = urls
    .map((url) => extractYoutubeVideoId(url))
    .filter((id): id is string => id !== null);

  return [...new Set(videoIds)];
}

// 텍스트에서 유튜브 URL 제거
export function removeYoutubeUrls(text: string): string {
  // 쿼리 파라미터 포함한 URL 패턴
  const urlPattern =
    /https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?[^\s]+|embed\/[^\s]+|shorts\/[^\s]+)|youtu\.be\/[^\s]+)/g;

  return text.replace(urlPattern, "").trim();
}
