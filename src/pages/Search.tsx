import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import {
    InstantSearch,
    Hits,
    SearchBox,
    Pagination,
    Highlight,
    Configure,
} from 'react-instantsearch-dom';
import {Box, Flex, Text, VStack} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const searchClient = algoliasearch(
    'E9FPK631GA',
    '0b4e9dcf422c335844f6f416b453ce0f'
);

class Search extends Component {
    render() {
        return (
            <VStack>
                <Box p="4">
                    <Text fontSize="3xl" fontWeight="bold">Busca publicaciones o respuestas en Encodice</Text>
                </Box>
                <InstantSearch indexName="posts" searchClient={searchClient}>
                    <Configure hitsPerPage={6} />
                    <Flex justifyContent="center" alignItems="center" width="500px">
                        <SearchBox translations={{
                            submitTitle: '',
                            resetTitle: '',
                            placeholder: 'Busca aquí...',
                        }}
                        />
                    </Flex>
                    <Box p="4">
                        <Hits hitComponent={Hit} />
                        <Pagination />
                    </Box>
                </InstantSearch>
            </VStack>
        );
    }
}

function Hit(props: { hit: { topicId: string } }) {
    return (
        <Box p="4" borderWidth="1px" borderColor="gray.200" borderRadius="lg">
            <Text fontSize="xl" fontWeight="bold">
                <Highlight attribute="title" hit={props.hit} />
            </Text>
            <Text>
                <Highlight attribute="body" hit={props.hit} />
            </Text>
            <Text>Tema: {props.hit.topicId}</Text>
        </Box>
    );
}

Hit.propTypes = {
    hit: PropTypes.shape({
        objectID: PropTypes.string.isRequired,
        _highlightResult: PropTypes.object.isRequired,
        topicId: PropTypes.string.isRequired,
    }).isRequired,
};

export default Search;
