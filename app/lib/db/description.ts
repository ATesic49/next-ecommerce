export function formatDescription(description: string) {
  if (description.length > 160) {
    return description.slice(0, 160) + "...";
  } else return description;
}
