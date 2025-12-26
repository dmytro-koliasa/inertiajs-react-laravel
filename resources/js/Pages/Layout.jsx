import { Head, Link } from '@inertiajs/react';

export default function Layout({ children, title }) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex-shrink-0 flex items-center">
                                    <Link href="/" className="text-xl font-bold text-gray-900">
                                        {title || 'Laravel'}
                                    </Link>
                                </div>
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

