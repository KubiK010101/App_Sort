import React from 'react';
import './App.css';

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
    const { items, requestSort, sortConfig } = useSortableData(props.products);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
        <table>
            <caption>Products</caption>
            <thead>
            <tr>
                <th>
                    <button
                        type="button"
                        onClick={() => requestSort('name')}
                        className={getClassNamesFor('name')}
                    >
                        Імя
                    </button>
                </th>
                <th>
                    <button
                        type="button"
                        onClick={() => requestSort('price')}
                        className={getClassNamesFor('price')}
                    >
                        Ціна
                    </button>
                </th>
                <th>
                    <button
                        type="button"
                        onClick={() => requestSort('stock')}
                        className={getClassNamesFor('stock')}
                    >
                        В наявності
                    </button>
                </th>



                <th>
                    <button
                        type="button"
                        onClick={() => requestSort('size')}
                        className={getClassNamesFor('size')}
                    >
                        Розмір
                    </button>
                </th>
                <th className={getClassNamesFor('Photo')}
                >
                   Photo
                </th>
                <th className={getClassNamesFor('Data')}
                >
                   Data
                </th>
            </tr>
            </thead>
            <tbody>
            {items.map((item) => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>{item.stock}</td>
                    <td>{item.size}</td>

                    <td><img  src={item.img} alt=""/></td>
                    <td>{item.data}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default function App() {
    return (
        <div className="App">
            <ProductTable
                products={[
                    { id: 1, name:'Cheese', price: 4.9, stock: 20, size:50, color:'Yellow',data:'7/05/2021',img:'https://blog.metro.ua/wp-content/uploads/2019/04/1-min-12.jpg'},
                    { id: 2, name: 'Milk', price: 1.9, stock: 32,  size:10, color:' White',data:'7/03/2021',img:'https://usba.com.ua/sites/default/files/2018-06/%D0%9C%D0%BE%D0%BB%D0%BE%D0%BA%D0%BE-600x600.jpg'},
                    { id: 3, name: 'Yoghurt', price: 2.4, stock: 12,  size:500, color:'Pink',data:'7/01/2021',img:'https://roscontrol.com/files/images/articles/41/c8/41c83450cbfbded8d70a_content_big_87fde87d.jpg' },
                    { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9,  size:5, color:'White',data:'7/07/2021',img:'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2F1543354602%2F1811w-whipped-cream-comparison-publix.jpg%3Fitok%3DWTPTwWek' },
                    { id: 5, name: 'Butter', price: 0.9, stock: 99,  size:65, color:'Slight-Yellow',data:'7/02/2021', img:'https://agropolit.com/media/news/o-o-w/00/10/10234/maslo1-14789.jpg' },
                    { id: 6, name: 'Sour Cream ', price: 2.9, stock: 86,  size:60, color:'White',data:'7/08/2021', img:'https://static.wikia.nocookie.net/edopedia/images/2/28/%D0%A1%D0%BC%D0%B5%D1%82%D0%B0%D0%BD%D0%B0.JPG/revision/latest/scale-to-width-down/866?cb=20170615171958&path-prefix=ru' },
                    { id: 7, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12,  size:30, color:'RGBA',data:'7/08/2021', img:'https://papanizza.fr/wp-content/uploads/2016/06/935bdf72e0.jpg' },
                ]}
            />
        </div>

    );
}
