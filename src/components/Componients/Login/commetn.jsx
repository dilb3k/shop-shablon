import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = () => {
    const [formData, setFormData] = useState({
        user: '',  // Qo'lda user ID kiritish uchun
        product_id: '',
        text: '',
        rating: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post(
                'http://localhost:8000/comment/comment/',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 201) {
                setSuccess(true);
                setFormData({
                    user: '',
                    product_id: '',
                    text: '',
                    rating: '',
                });
            }
        } catch (err) {
            setError(err.response?.data || 'An error occurred while submitting the review');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h2>Write a Review</h2>

            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '15px' }}>Review submitted successfully!</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label htmlFor="user" style={{ display: 'block', marginBottom: '5px' }}>User ID:</label>
                    <input
                        type="number"
                        id="user"
                        name="user"
                        value={formData.user}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div>
                    <label htmlFor="product_id" style={{ display: 'block', marginBottom: '5px' }}>Product ID:</label>
                    <input
                        type="text"
                        id="product_id"
                        name="product_id"
                        value={formData.product_id}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div>
                    <label htmlFor="text" style={{ display: 'block', marginBottom: '5px' }}>Review Text:</label>
                    <textarea
                        id="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        required
                        maxLength={244}
                        style={{ width: '100%', padding: '8px', minHeight: '100px' }}
                    />
                </div>

                <div>
                    <label htmlFor="rating" style={{ display: 'block', marginBottom: '5px' }}>Rating (0-5):</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        step="0.01"
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: isSubmitting ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;