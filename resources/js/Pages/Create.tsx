import Layout from '@/Layouts/Layout';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        body: '',
    });

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        post('/posts');
    };

    console.log('errors', errors);

    return (
        <Layout title="Test Page">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Create Page
                        </h1>
                        <div className="text-gray-600 w-1/2 mx-auto">
                            <form action="" onSubmit={submitHandler}>
                                <textarea
                                    name=""
                                    id=""
                                    className="w-full border border-blue-500 rounded-l h-[100px] p-2"
                                    value={data.body}
                                    onChange={(e) =>
                                        setData('body', e.target.value)
                                    }
                                ></textarea>
                                {errors.body && <strong>{errors.body}</strong>}
                                <button
                                    type="submit"
                                    className="border border-blue-500 rounded-l w-full p-2 text-center uppercase bg-blue-300 !text-black cursor-pointer"
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
