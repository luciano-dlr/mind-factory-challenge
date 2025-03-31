import { NavBar } from "../components/NavBar/NavBar";

export interface LayoutProps {
    children: React.ReactNode;
    onDelete?: () => void;
}

export const Layout = ({ children, onDelete }: LayoutProps) => {

    return (
        <main>
            <NavBar onDelete={onDelete} />
            {children}
        </main>
    );
};