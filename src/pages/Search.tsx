import { Box, VStack } from "@chakra-ui/react";
import algoliasearch from "algoliasearch/lite";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
} from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "E9FPK631GA",
  "0b4e9dcf422c335844f6f416b453ce0f"
);

function Hit(props: { hit: { topicId: string } }) {
  return (
    <Box p="4" borderWidth="1px" borderColor="gray.200" borderRadius="lg">
      <Box as="h3" fontSize="xl" fontWeight="bold">
        <Highlight attribute="title" hit={props.hit} />
      </Box>
      <Box as="p">
        <Highlight attribute="body" hit={props.hit} />
      </Box>
      <Box>Tema: {props.hit.topicId}</Box>
    </Box>
  );
}

class Search extends Component {
  render() {
    return (
      <VStack>
        <Box p="4">
          <Box as="h1" fontSize="3xl" fontWeight="bold">
            Busca publicaciones o respuestas en Encodice
          </Box>
        </Box>
        <InstantSearch indexName="posts" searchClient={searchClient}>
          <Configure hitsPerPage={6} />
          <Box width="500px" mx="auto">
            <SearchBox
              translations={{
                submitTitle: "",
                resetTitle: "",
                placeholder: "Busca aquí...",
              }}
            />
          </Box>
          <Box p="4" maxW="70%">
            <Hits hitComponent={Hit} />
            <Pagination
              showLast={false}
              translations={{
                previous: "Anterior",
                next: "Siguiente",
              }}
            />
          </Box>
        </InstantSearch>
      </VStack>
    );
  }
}

class SearchPage extends Component {
  componentDidMount() {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      ReactDOM.hydrate(<Search />, rootElement);
    }
  }

  render() {
    return <Box id="root" />;
  }
}

export default SearchPage;
