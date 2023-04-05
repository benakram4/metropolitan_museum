import useSWR from 'swr'
import Error from 'next/error'
import { Button, Card } from 'react-bootstrap'
import { useState } from 'react'
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';
import { useEffect } from 'react';


export default function ArtworkCardDetail({ objectID }) {

    console.log(`this is the object id: ${objectID}`);

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(()=>{
        setShowAdded(favouritesList?.includes(objectID))
    }, [favouritesList])
    

    const favouritesClicked = async () => {
        if(showAdded){

            setFavouritesList(await removeFromFavourites(objectID)); 
            setShowAdded(false);
        }
        else{

            setFavouritesList(await addToFavourites(objectID));
            setShowAdded(true); 
        }
    }

    const { data, error } = useSWR( objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null)

    if (error) {
        return <Error statusCode={404} />
    }

    if (!data) {
        return null;
    }


    const { primaryImage, title, objectDate,
        classification, medium, artistDisplayName,
        creditLine, artistWikidata_URL, dimensions} = data

    return (
        <>
            <Card className="rounded">
                {primaryImage && <Card.Img variant="top" src={primaryImage} />}
                <Card.Body>
                    <Card.Title>{title || 'N/A'}</Card.Title>
                    <Card.Text>
                        <strong>Date:</strong> {objectDate || 'N/A'}
                        <br />
                        <strong>Classification:</strong> {classification || 'N/A'}
                        <br />
                        <strong>Medium:</strong> {medium || 'N/A'}
                        <br /> <br />
                        <strong>Artist:</strong> {(artistDisplayName || 'N/A')}
                        ({(<a href={ artistWikidata_URL } target="_blank" rel="noreferrer">wiki</a>)}) <br/>
                        <strong>Credit Line:</strong> { creditLine || 'N/A'} <br/>
                        <strong>Dimensions:</strong> { dimensions || 'N/A' } <br /> <br />
                        <Button id="btn" variant={ showAdded ? "primary" : "outline-primary" } onClick={favouritesClicked}>{ showAdded ? "+ Favourite (added)" : "+ Favourite" }</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}