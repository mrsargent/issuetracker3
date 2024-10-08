'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AssigneeSelect = ({issue}: {issue: Issue}) => {
    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res=> res.data),
        staleTime: 60 * 1000,  //60 seconds
        retry: 3
    });

    if (isLoading) return <Skeleton/>;

    if (error) return null;

    //!!!! replaced by the useQuery hook by tanstack
    // const [users, setUsers] = useState<User[]>([]);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const { data } = await axios.get<User[]>('/api/users');
    //         setUsers(data);
    //     }

    //     fetchUsers();

    // }, []);

    return (
        <Select.Root 
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={(userId) => {
            axios.patch('/api/issues/' + issue.id, {assignedToUserId: userId || null})
        }}>
            <Select.Trigger placeholder='Assign ...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>                 
                    {users?.map(user =>
                        <Select.Item
                            key={user.id}
                            value={user.id}>
                            {user.name}
                        </Select.Item>)}
                </Select.Group>
            </Select.Content>
        </Select.Root>

    )
}

export default AssigneeSelect