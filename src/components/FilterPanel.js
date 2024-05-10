import React, { useState } from 'react';
import moment from 'moment';

const FilterPanel = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [startDate, setStartDate] = useState(moment().subtract(7, 'days').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));

    const handleSearch = () => {
        const startTime = new Date(startDate).toISOString();
        const endTime = new Date(endDate).toISOString();
        onSearch(query, startTime, endTime);
    };

    return (
        <div className="filter-panel">
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Enter keyword or hashtag"
            />
            <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
            />
            <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default FilterPanel;
