const files = import.meta.glob("../images/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

export default function eventImageUrl(name) {
  return name ? files[`../images/${name}`] || null : null;
}
