import { Card, Button } from 'react-bootstrap'
import { Col, Row} from "react-bootstrap";
import Link from 'next/link'
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    if(!favouritesList) return null;

    return (
        <>
            <h1>Your Favourites</h1>
            <hr />
            {favouritesList.length > 0 ? (
                <Row className="gy-4">
                    {favouritesList.map((currentObjectID) => (
                        <Col lg={3} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Card>
                    <Card.Body>
                        <Card.Title>Nothing Here</Card.Title>
                        <Card.Text>Try adding some new artwork to the list.</Card.Text>
                    </Card.Body>
                </Card>
            )}
        </>
    )
}