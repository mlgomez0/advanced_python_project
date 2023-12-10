'use client';


export interface IMovieRatingModalProps {
    isOpen: boolean;
    rating: number;
    onClose: () => void;
}

export default function MovieRatingModal({ isOpen, rating, onClose }: IMovieRatingModalProps): JSX.Element | null {

    const getStarRating = (): string => {
        switch (rating) {
            case 1:
                return '⭐';
            case 2:
                return '⭐⭐';
            case 3:
                return '⭐⭐⭐';
            default:
                return '';
        }
    };

    if (!isOpen)
        return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center select-none">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-1/5" style={{ minWidth: '300px' }}>
                <h2 className="text-2xl font-bold mb-4 text-blue-900">Your rating</h2>
                <div className="text-4xl mb-4">{getStarRating()}</div>
                <button
                    onClick={onClose}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Close
                </button>
            </div>
        </div>
    );
}