import { useState } from 'react';
import Form from './Form';
import Logo from './Logo';
import PackingList from './PackingList';
import Stats from './Stats';

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems((items) => [...items, item]);
    }

    function handleCrearItems() {
        const confirmed = window.confirm(
            'Are you sure you want to delete all items?'
        );
        if (confirmed) setItems([]);
    }

    function handleDeleteItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onClearItems={handleCrearItems}
                onDeleteItem={handleDeleteItem}
                onToggleItem={handleToggleItem}
            />
            <Stats items={items} />
        </div>
    );
}
