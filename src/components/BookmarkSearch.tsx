type BookmarkSearchProps = {
    search: string,
    onSearchChange: (value : string) => void,
}

export default function BookmarkSearch({
    search,
    onSearchChange,
}: BookmarkSearchProps) {

    return (
        <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search bookmarks..."
            className="w-full p-3 mt-6 border border-slate-300 rounded-lg bg-white text-slate-900"
        />
    )
}