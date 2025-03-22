// Example usage in another file
import React, { useState } from 'react';
import Badge from '../Badges/Badge';
import Input from '../Inputs/Input';
import Select from '../Selects/select';
import Button from '../Buttons/Button';
import Card from '../Cards/Card';

const RSVPForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        attending: '',
        guests: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        // Submit form data
    };

    const attendingOptions = [
        { value: 'yes', label: 'Ha, men qatnashaman' },
        { value: 'no', label: 'Afsuski, qatnasha olmayman' }
    ];

    const guestOptions = [
        { value: '0', label: 'Mehmon yo\'q' },
        { value: '1', label: '1 Mehmon' },
        { value: '2', label: '2 Mehmon' },
        { value: '3', label: '3 Mehmon' }
    ];

    return (
        <div className="max-w-md mx-auto my-10">
            <Card variant="elegant" className="relative">
                <div className="absolute -top-3 -right-3">
                    <Badge variant="elegant" size="medium">To'y uchun taklifnoma</Badge>
                </div>

                <Card.Header className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Bizning to'yimizga tashrif buyuring</h2>
                    <p className="text-amber-700 mt-1">Javobingizni 01.05.2025 gacha yuboring</p>
                </Card.Header>

                <Card.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <Input
                                label="Ism Familiya"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ism familiyangizni kiriting"
                                required
                            />

                            <Input
                                type="email"
                                label="Elektron pochta"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Elektron pochtangizni kiriting"
                                required
                            />

                            <Input
                                type="tel"
                                label="Telefon"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+998 __ ___ __ __"
                            />

                            <Select
                                label="Qatnashasizmi?"
                                name="attending"
                                value={formData.attending}
                                onChange={handleChange}
                                options={attendingOptions}
                                required
                            />

                            {formData.attending === 'yes' && (
                                <Select
                                    label="Mehmonlar soni"
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    options={guestOptions}
                                    required
                                />
                            )}
                        </div>

                        <div className="mt-6">
                            <Button type="submit" variant="primary" fullWidth>
                                Javobni yuborish
                            </Button>
                        </div>
                    </form>
                </Card.Body>

                <Card.Footer className="text-center text-sm text-gray-600">
                    Savollar uchun: +998 90 123 45 67
                </Card.Footer>
            </Card>
        </div>
    );
};

export default RSVPForm;