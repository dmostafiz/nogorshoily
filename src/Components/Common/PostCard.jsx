import { Avatar, Badge, Box, Button, Center, Flex, Heading, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Show, Stack, Text, useBreakpoint, Wrap } from '@chakra-ui/react'
import { Title, Tooltip } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import banglaNumber from '../../Helpers/banglaNumber'
import formatDate from '../../Helpers/formatDate'
import PostTrancate from './PostTrancate'
import { BsArrowRightShort, BsSave2 } from 'react-icons/bs'
import { VscReport } from 'react-icons/vsc'
import { FcReading } from 'react-icons/fc'
import { HiChevronDown } from 'react-icons/hi'
import AuthorHoverCard from './AuthorHoverCard'
import { BiCommentDetail, BiLike } from 'react-icons/bi'
import useOnlineUser from '../../Hooks/useOnlineUser'
import { AlignJustified, Pencil } from 'tabler-icons-react'
import usePostAction from '../../Hooks/usePostAction'
import useUser from '../../Hooks/useUser'
// import { ThumbUpOff } from 'tableicons-react'

export default function PostCard({ id, title, image, content, createdAt, postType, parent, postPart, childs, states, author, slug, categories, authorCard = true }) {

    const { savePost, isPostSaved } = usePostAction()

    const { authUser } = useUser()

    return (
        <Flex borderTop={{ base: '1px', md: '1px', lg: '1px', xl: '1px' }} borderBottom={{ base: '0px', md: '0px', lg: '0px', xl: '0px' }} borderColor={{ base: 'blackAlpha.100', sm: 'blackAlpha.100', md: 'blackAlpha.100', lg: 'blackAlpha.100', xl: 'blackAlpha.100' }} shadow={{ xl: 'sm' }} pt={{xl:4}} w='full' rounded='lg' gap={{ base: 0, xl: 6 }} px={{ base: 0, md: 1, lg: 1, xl: 3 }} direction={{ base: 'column', md: 'column', lg: 'column', xl: 'row' }} mb={0}>

            <Box w={{ base: 'full', md: 'full', lg: 'full', xl: '220px' }}>

                {image &&
                    <Show above='lg'>
                        <Link href={`/blog/${slug}`}>
                            <a href={`/blog/${slug}`}>
                                <Image
                                    w={{ base: 'full', lg: 'full' }}
                                    h={{ base: '250px', sm: '350px', md: '350px', xl: '160px' }}
                                    rounded={'md'}
                                    mb={2}
                                    objectFit='cover'
                                    src={image}
                                    shadow='md'
                                />
                            </a>
                        </Link>
                    </Show>

                }

                <Box mb={2} mt={3}>
                    <Link href={`/blog/${slug}`}>
                        <a href={`/blog/${slug}`}>
                            <Tooltip withArrow label={title}>
                                <Text as={'h3'} fontSize='22px' fontWeight={'bold'} noOfLines={2} lineHeight={{ base: 1.2, lg: 1.1 }} color='gray.700'>
                                    {title}
                                </Text>
                            </Tooltip>
                        </a>
                    </Link>
                </Box>

                <Flex direction={{ xl: 'column' }} gap={{ base: 2, xl: 0 }} mb={{base: 1, xl:2}}>
                    <Flex gap={1} alignItems='center'>
                        {/* <Text color3='gray.700' fontSize={'15px'}>লিখেছেন</Text> */}
                        <AuthorHoverCard color='gray.500' author={author} />
                    </Flex>

                    <Text fontSize={{ base: '15px', xl: '13px' }} letterSpacing='-0.8px' color={'blackAlpha.400'} >
                        {formatDate(createdAt)}
                    </Text>
                </Flex>

            </Box>

            <Box flex='1' color={{ base: 'blackAlpha.600', md: 'gray.600' }} lineHeight={{ base: '22px', md: '23px' }} fontSize={{ base: '17px', md: '17px' }} w='full' pb={2}>

                <PostTrancate
                    image={image}
                    char={100}
                    content={content}
                />

                <Flex w='full' gap={5} justify='space-between' mt={3} alignItems={'center'}>
                    <Flex gap={3} alignItems={'center'}>

                        <Menu>
                            <MenuButton as={IconButton} icon={<HiChevronDown size={'18'} />} color='blackAlpha.700' size='xs' variant='outline' colorScheme='gray' rounded='xl' />
                            <MenuList fontSize={'14px'} shadow='lg'>

                                {(!isPostSaved(id) && author.id != authUser?.id) && <MenuItem onClick={() => savePost(id)} icon={<BsSave2 size={14} />}>সংরক্ষণে রাখুন</MenuItem>}

                                {author.id == authUser?.id && <Link href={`/editor/${id}?editorStatus=update`}>
                                    <MenuItem icon={<Pencil size={14} />}>এডিট করুন</MenuItem></Link>}

                                {author.id != authUser?.id && <MenuItem icon={<VscReport size={14} />}>রিপোর্ট করুণ</MenuItem>}

                                {/* <MenuItem>Create a Copy</MenuItem> */}
                            </MenuList>
                        </Menu>

                        <Tooltip withArrow color={'black'} label={`${banglaNumber(states.read)} জন ব্লগটি পড়েছেন`}>
                            <Flex alignItems={'center'} gap={'2px'} color={'gray.500'}>
                                <FcReading color='' size='16px' />
                                <Text color='facebook.500' as={'span'} fontWeight={'black'} fontSize='14px'>
                                    {banglaNumber(states.read)}</Text>
                            </Flex>
                        </Tooltip>

                        <Tooltip label={`${banglaNumber(states.comment)} টি মন্তব্য`}>
                            <Flex whiteSpace='nowrap' alignItems={'center'} gap={'5px'} color={'gray.500'}>
                                <Icon withArrow as={BiCommentDetail} color='facebook.300' fontSize='15px' />
                                <Flex gap={'5px'}>
                                    <Text as={'span'} color='facebook.500' fontWeight={'black'} fontSize='14px'>
                                        {banglaNumber(states.comment)}</Text>
                                </Flex>
                            </Flex>
                        </Tooltip>

                        <Tooltip withArrow label={`${banglaNumber(states.like)} জন লাইক দিয়েছেন`} color={'black'}>
                            <Flex whiteSpace='nowrap' alignItems={'center'} gap={1}>
                                <Icon as={BiLike} color='facebook.300' fontSize='16px' />
                                <Text as={'span'} color='facebook.500' fontSize='14px' fontWeight={'black'}>{banglaNumber(states.like)}
                                </Text>
                            </Flex>
                        </Tooltip>

                    </Flex>

                    <Link href={`/blog/${slug}`}>
                        <Flex whiteSpace='nowrap' alignItems={'center'} gap={'2px'} fontWeight='normal'>
                            <Text cursor={'pointer'} color='gray.400' as={'span'} fontSize={'14px'} href={`/blog/${slug}`}>
                                বিস্তারিত
                            </Text>
                            <Icon as={BsArrowRightShort} color='gray.400' fontSize='18px' />
                        </Flex>
                    </Link>
                </Flex>
            </Box>

        </Flex>
    )
}
