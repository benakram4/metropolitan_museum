import { useAtom } from 'jotai';
import { searchHistoryAtom, favouritesAtom } from '@/store';
import { useRouter } from 'next/router';
import { Card, Button, ListGroup } from 'react-bootstrap'
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';

export default function History() {
    // Get a reference to the "searchHistory" from the "searchHistoryAtom
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const router = useRouter();


    if (!searchHistory) return null;

    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        router.push(`/artwork?${searchHistory[index]}`);
    }

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation();
        setSearchHistory(await removeFromHistory(searchHistory[index]))
    }

    return (
        <div>
            <h1>Search History</h1>
            <hr />
            {parsedHistory.length > 0 ? (
                <ListGroup>
                    {parsedHistory.map((historyItem, index) => (
                        <ListGroup.Item className={styles.historyListItem} key={`${index}`} action onClick={(e) => historyClicked(e, index)}>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className='my-1'>{Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}</p>
                                <Button variant="danger" onClick={(e) => removeHistoryClicked(e, index)}>Remove</Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <Card>
                    <Card.Body>
                        <Card.Title>Nothing Here</Card.Title>
                        <Card.Text>Try searching for some artwork.</Card.Text>
                    </Card.Body>
                </Card>
            )
            }
        </div>
    );
}