import { Compass } from "lucide-react";

interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
    image: string;
}

const TestimonialCard = ({
    quote,
    author,
    role
}: TestimonialCardProps) => {
    return (
        <div className="w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow rounded-lg p-8">
                <div className="px-4 py-5 flex-auto">
                    <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-full bg-white">
                        <Compass className="text-xl text-indigo-600" />
                    </div>
                    <p className="mb-4 text-gray-700 italic">
                        &quot;{quote}&quot;
                    </p>
                    <div className="flex items-center justify-center">
                        {/* <Image 
                src={image} 
                alt={author}
                className="w-12 h-12 rounded-full mr-4 object-cover"
                width={48}
                height={48}
              /> */}
                        <div className="text-left">
                            <h6 className="text-xl font-semibold text-gray-800">
                                {author}
                            </h6>
                            <p className="text-gray-600 font-light">{role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TestimonialCard;
