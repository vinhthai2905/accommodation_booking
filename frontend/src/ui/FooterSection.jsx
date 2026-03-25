export default function FooterSection({ column }) {
    return (
        <div key={column.title}>
            <h3 className="text-xs font-bold leading-tight text-neutral-900">
                {column.title}
            </h3>

            <ul className="mt-2 space-y-3">
                {column.links.map((link) => (
                    <li key={link}>
                        <a
                            href="#"
                            className="text-xs leading-1 text-neutral-900 hover:underline"
                        >
                            {link}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}