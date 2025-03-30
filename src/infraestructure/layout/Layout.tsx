import { NavBar } from "../components/navBar/NavBar";

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