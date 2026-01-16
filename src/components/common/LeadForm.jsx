import React, { useState } from 'react';

const LeadForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        eventType: 'Wedding',
        date: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `New Inquiry from Website%0A
    Name: ${formData.name}%0A
    Phone: ${formData.phone}%0A
    Event Type: ${formData.eventType}%0A
    Event Date: ${formData.date}%0A
    Message: ${formData.message}`;

        window.open(`https://wa.me/91XXXXXXXXXX?text=${text}`, '_blank');
        if (onSuccess) onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none"
                    placeholder="John Doe"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        +91
                    </span>
                    <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none"
                        placeholder="9876543210"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                    <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary outline-none"
                    >
                        <option value="Wedding">Wedding</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Reception">Reception</option>
                        <option value="Engagement">Engagement</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary outline-none"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary outline-none"
                    placeholder="Tell us about your requirements..."
                ></textarea>
            </div>
            <button
                type="submit"
                className="w-full btn-primary shadow-xl"
            >
                Get Best Quote via WhatsApp
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">
                We reply within 10 minutes.
            </p>
        </form>
    );
};

export default LeadForm;
