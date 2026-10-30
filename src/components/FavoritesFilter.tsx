type FavoritesFilterProps = {
    checked: boolean,
    onCheckedChange: (value: boolean) => void,
}

export default function FavoritesFilter({
    checked,
    onCheckedChange,
}: FavoritesFilterProps) {
    return (
        <label className="mt-4 flex items-center gap-2 text-slate-700">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onCheckedChange(e.target.checked)}
            />
            <span>Show favorites only</span>
        </label>
    )
}