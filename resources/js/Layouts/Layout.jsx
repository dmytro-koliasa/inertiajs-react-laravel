import { Head, Link } from '@inertiajs/react';

const routes = [
    {
        path: '/',
        title: 'Home',
    },
    {
        path: '/test',
        title: 'Test',
    },
    {
        path: '/test/test',
        title: 'Test Nested',
    }
];

export default function Layout({ children, title }) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <ul className="flex-shrink-0 flex items-center gap-2">
                                    {routes.map((item) => (
                                        <li>
                                            <Link href={item.path} className="text-xl font-bold text-gray-900">
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <main className="py-6">
                    {children}
                </main>
            </div>
        </>
    );
}

