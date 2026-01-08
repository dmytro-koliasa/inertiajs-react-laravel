import Layout from '@/Layouts/Layout';
import { Link } from '@inertiajs/react';

interface HomeProps {
    posts: {
        data: any[];
        links: any[];
    };
}

export default function Home({ posts }: HomeProps) {
    console.log('posts', posts);

    return (
        <Layout title="Home">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg p-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Добро пожаловать в Inertia.js!
                        </h1>

                        <div className="space-x-4">
                            <ul className="flex flex-wrap gap-[10px]">
                                {posts.data.length > 0 &&
                                    posts.data.map(
                                        ({ body, id, created_at }) => {
                                            return (
                                                <li
                                                    className="!text-gray-900 w-[calc((100%-20px)/3)] p-4 border rounded-2xl"
                                                    key={id}
                                                >
                                                    {body}
                                                    <br />
                                                    <strong>
                                                        {new Date(
                                                            created_at
                                                        ).toLocaleTimeString()}
                                                    </strong>
                                                </li>
                                            );
                                        }
                                    )}
                            </ul>
                        </div>
                        <div className="space-x-4 m-4">
                            <ul className="flex gap-2">
                                {posts.links.length > 0 &&
                                    posts.links.map(
                                        ({ active, label, page, url }) => {
                                            return url ? (
                                                <li
                                                    className="px-2 py-1 border border-blue-600 flex items-center justify-center"
                                                    key={label}
                                                >
                                                    <Link
                                                        href={url}
                                                        dangerouslySetInnerHTML={{
                                                            __html: label,
                                                        }}
                                                        className={
                                                            active
                                                                ? 'font-bold'
                                                                : ''
                                                        }
                                                    />
                                                </li>
                                            ) : null;
                                        }
                                    )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
