import React from 'react'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { NavLink } from '@mantine/core'
import { IconBook, IconChevronRight, IconListCheck, IconListDetails } from '@tabler/icons'
import { MdOutlineForum } from 'react-icons/md'
import useUser from '../../Hooks/useUser'
import { Heart, Logout, Pencil, Power, User } from 'tabler-icons-react'
import Link from 'next/link'

export default function BlogPanel() {

    const { isLoading, authUser, logoutUser } = useUser()

    return (
        <Box mb={5} bg=''>

            {(!isLoading && authUser) && <Box>

                <NavLink
                    label={<Text fontSize={'17px'} fontWeight={500}>{authUser.displayName}</Text>}
                    description={<Text as='' fontSize={'12px'} color='blackAlpha.600'>@{authUser.userName}</Text>}
                    icon={<Avatar size={'md'} name={authUser.displayName} src={authUser.avatar} />}
                    rightSection={<IconChevronRight size={12} stroke={1.5} />}
                    // active
                    variant="filled"
                    // variant="subtle"
                    // color={'blue'}
                >
                    <NavLink  icon={<User />} label="প্রোফাইল" />
                    <NavLink  icon={<Pencil />} label="আমার লিখাসমূহ" />
                    <NavLink  icon={<Heart />} label="আমার পছন্দ তালিকা" />
                    {/* <NavLink onClick={logoutUser} icon={<Power />} label="লগ-আউট" /> */}
                </NavLink>
            </Box>

            }

            <Box bg={'blackAlpha.50'} _hover={{ bg: 'blackAlpha.200' }}>
                <Link href='/'>
                    <NavLink
                        label={<Text fontSize={'17px'} fontWeight={500}>রঙ্গন প্রচ্ছদ</Text>}
                        // description={'সকল পোস্ট দেখুন'}
                        icon={<IconListDetails size={32} stroke={2} color='#385898' />}
                        // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                        // active
                        variant="subtle"
                        color={'light'}
                    />
                </Link>

            </Box>
            {/* 
            <Box>
                <Link href='/selected_posts'>
                    <NavLink
                        label={<Text fontSize={'17px'} fontWeight={500}>বাছাইকৃত পোস্ট</Text>}
                        // description={'নির্বাচিত পোস্ট গুলো দেখুন'}
                        icon={<IconListCheck size={32} stroke={2} />}
                        // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                        active
                        variant="subtle"
                        color={'dark'}
                    />
                </Link>

            </Box> */}

            <Box>
                <Link href='/selected_posts'>
                    <NavLink
                        label={<Text fontSize={'17px'} fontWeight={500}>পিডিএফ বই সামগ্রী</Text>}
                        // description={'নির্বাচিত পোস্ট গুলো দেখুন'}
                        icon={<IconBook size={32} stroke={2} color='#385898' />}
                        // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                        // active
                        variant="subtle"
                        color={'light'}
                    />
                </Link>

            </Box>

            <Box>
                <NavLink

                    label={<Flex gap={1} alignItems='center'>
                        <Text fontSize={'17px'} fontWeight={700}>ডিসকাশন প্যানেল</Text>
                        (<Text fontSize={'15px'} fontWeight='900' color='red.300'>৮ জন</Text>)
                    </Flex>}
                    description={'কমিউনিটি ডিসকাশন প্যানেল এ অন্যান্য ব্লগারদের সাথে বিষয় ভিত্তিক আলোচনা করুন...'}
                    icon={<MdOutlineForum size={32} color='#385898' />}
                    // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                    // active
                    variant="subtle"
                    color={'dark'}
                />
            </Box>
        </Box>
    )
}
