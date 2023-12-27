import { Card } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { useAtom } from "jotai";
import { favoritesAtom } from "@/store";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favorites() {
  const [favoritesList, setFavoritesList] = useAtom(favoritesAtom);

  if (!favoritesList) return null;

  return (
    <>
      <h1>Your Favorites</h1>
      <hr />
      {favoritesList.length > 0 ? (
        <Row className="gy-4">
          {favoritesList.map((currentObjectID) => (
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
  );
}
