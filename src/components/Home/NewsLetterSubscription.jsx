const NewsletterSubscription = () => {
    return (
        <section className="bg-purple-100 p-8">
            <div className="p-8 mx-auto max-w-screen-xl">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="mb-4 text-2xl text-center tracking-tight font-extrabold leading-tight text-gray-900">
                        Sign up for our newsletter
                    </h2>
                    <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600 text-center mb-8">
                        You will never miss any of our events, latest news, and other important information. We
                        promise not to spam your mail!
                    </p>
                </div>
                <div className="flex justify-center">
                    <input type="email" placeholder="Enter your Email" required 
                        className="block w-96 p-4 text-sm text-gray-900 border border-gray-100 bg-white" />
                    <button type="button"
                        className="relative flex items-center justify-center px-6 text-sm font-medium text-white transition-colors duration-300 pointer-events-auto bg-gray-900 hover:bg-gray-800">
                        <span>Subscribe</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSubscription;