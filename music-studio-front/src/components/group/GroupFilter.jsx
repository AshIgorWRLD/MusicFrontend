import React from 'react';
import MyInput from "../UI/input/MyInput";
import MySelect from "../UI/select/MySelect";

const GroupFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder="Search.."
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Sort"
                options={[
                    {value: 'name', name: 'by name'}
                ]}
            />
        </div>
    );
};

export default GroupFilter;