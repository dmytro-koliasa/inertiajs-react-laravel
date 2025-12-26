import Layout from '@/Layouts/Layout';

export default function Home() {
    return (
        <Layout title="Home">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg p-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Добро пожаловать в Inertia.js!
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Inertia.js успешно настроен и работает с React.
                        </p>
                        <div className="space-x-4">
                            <a
                                href="https://inertiajs.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Документация Inertia.js
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

