export function UserProfileLoader() {
  return (
    <div className="p-4 space-y-4">
      {/* Profile picture */}
      <div className="rounded-full bg-white h-[300px] w-[300px] animate-pulse"></div>
      <div className="space-y-2">
        <div className="rounded-lg bg-white h-6 animate-pulse w-80"></div>
        <div className="rounded-lg bg-white h-6 animate-pulse w-64"></div>
        <div className="rounded-lg bg-white h-6 animate-pulse w-48"></div>
      </div>
      <div className="rounded-lg bg-white h-56 animate-pulse"></div>
    </div>
  );
}
