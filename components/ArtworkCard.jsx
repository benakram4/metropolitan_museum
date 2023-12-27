import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const { primaryImageSmall, title, objectDate, classification, medium } = data;
  return (
    <>
      <Card className="h-100 rounded text-black">
        <Card.Img
          variant="top"
          src={
            primaryImageSmall ||
            "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
          }
        />
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <Card.Title>{title || "N/A"}</Card.Title>
          <Card.Text>
            <strong>Date:</strong> {objectDate || "N/A"}
            <br />
            <strong>Classification:</strong> {classification || "N/A"}
            <br />
            <strong>Medium:</strong> {medium || "N/A"}
          </Card.Text>
          <Link href={`/artwork/${objectID}`} passHref>
            <Button id="btn" variant="primary">
              <strong>ID : </strong>
              {objectID}
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
