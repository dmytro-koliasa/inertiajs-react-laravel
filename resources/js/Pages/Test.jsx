import Layout from './Layout';

export default function Test() {
    return (
        <Layout title="Test Page">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Test Page
                        </h1>
                        <p className="text-gray-600">
                            Это тестовая страница, работающая через Inertia.js
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

