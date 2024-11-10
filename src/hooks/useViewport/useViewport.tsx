import { useWindowWidth } from "@react-hook/window-size";

const LARGE = "large";
const MEDIUM = "medium";
const SMALL = "small";

function getViewportRangeStatus(status: "large" | "medium" | "small") {
  return { [status]: true, status };
}

function useViewport() {
  const width = useWindowWidth();

  if (width < 768) {
    return getViewportRangeStatus(SMALL);
  }

  if (width < 1025) {
    return getViewportRangeStatus(MEDIUM);
  }

  return getViewportRangeStatus(LARGE);
}

export { useViewport };
