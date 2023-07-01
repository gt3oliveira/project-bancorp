import { ReactNode } from 'react'

type TableViewProps = {
    children: ReactNode;
}

export default function TableView({children}: TableViewProps) {
    return (
        <div>
            {children}
        </div>
    )
}
