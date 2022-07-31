import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'
import { FC } from 'react';
import { Torrent } from '../models/torrent';

interface TorrentsTableProps {
    torrents: Torrent[]
}

export const TorrentsTable: FC<TorrentsTableProps>  = (props: TorrentsTableProps): JSX.Element => {
    let torrents: Torrent[] = props.torrents;
    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Info Hash</Th>
                        <Th>Added</Th>
                        <Th>Total Peers</Th>
                        <Th>Seeders</Th>
                        <Th>Leechers</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        torrents.map(torrent => {
                            let total: number = torrent.peers.length;
                            let seeders: number = torrent.peers.filter(peer => !peer.left).length;
                            let leechers: number = total - seeders;
                            return (
                                <Tr>
                                    <Td>{torrent.infoHash}</Td>
                                    <Td>{torrent.added.getDate() + "/" + (torrent.added.getMonth() + 1) + "/" + torrent.added.getFullYear() + " " + torrent.added.getHours() + ":" + torrent.added.getMinutes()}</Td>
                                    <Td>{total}</Td>
                                    <Td>{seeders}</Td>
                                    <Td>{leechers}</Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    );
}