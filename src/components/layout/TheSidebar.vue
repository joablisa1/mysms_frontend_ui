<template>
<div class="relative duration-200 ease-in-out inset-0
        z-20
        transition-opacity bg-gray-800 w-60 sm:block lg:relative" :class="sideBarOpen ? 'block' : 'hidden'" @click="sideBarOpen= false">
    <div class="bg-gray-800 w-60 dark:bg-gray-800 sm:block" v-if="currentUser">

        <div class="py-2 text-xl tracking-widest text-center uppercase bg-gray-900 border-b-2 border-gray-800">
            <router-link to="/home" class="text-white">DashBoard</router-link>
        </div>

        <nav class="pl-2 text-sm text-gray-300 w-60 ">
            <ul class="flex flex-col">
                <li class="px-3 py-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                    Section
                </li>

                <router-link v-slot="{ isExactActive, href, navigate }" to="/home" custom>
                    <li class="px-4 cursor-pointer" :class="[
                isExactActive
                  ? 'bg-gray-500 text-gray-800'
                  : 'hover:bg-gray-700',
              ]">
                        <a class="flex items-center py-3 text-white" :href="href" @click="navigate">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Dashboard
                        </a>
                    </li>
                </router-link>

                <li>

                    <Disclosure v-slot="{ open }" :default-open="isUserManagementActive">
                        <DisclosureButton class="flex items-center w-full px-4 py-3 shadow-md hover:bg-gray-700" :class="open ? 'bg-gray-700' : ''">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-5 h-5 text-amber-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>

                            User Management
                            <span class="ml-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="open ? 'transform rotate-90' : ''">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </DisclosureButton>
                        <DisclosurePanel>
                            <ul>
                                <router-link v-if="currentUser" v-slot="{ isExactActive, href, navigate }" :to="{ name: 'user' }" custom>
                                    <li class="pl-12" :class="[
                                isExactActive
                                  ? 'bg-gray-500 text-white'
                                  : 'hover:bg-gray-700',
                              ]">
                                        <a class="flex items-center py-3 font-normal text-white" :href="href" @click="navigate">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 text-white">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                            </svg>

                                            User
                                        </a>
                                    </li>
                                </router-link>

                            </ul>
                        </DisclosurePanel>
                    </Disclosure>
                </li>
                <li>
                    <Disclosure v-slot="{ open }" :default-open="isUserManagementActive">
                        <DisclosureButton class="flex items-center w-full px-4 py-3 shadow-md hover:bg-gray-700" :class="open ? 'bg-gray-700' : ''">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 text-lime-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                            </svg>

                            Organization
                            <span class="ml-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="open ? 'transform rotate-90' : ''">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </DisclosureButton>
                        <DisclosurePanel>
                            <ul>
                                <router-link v-slot="{ isExactActive, href, navigate }" :to="{ name: 'list-organization' }" custom>
                                    <li class="pl-12" :class="[
                                isExactActive
                                  ? 'bg-gray-500 text-white'
                                  : 'hover:bg-gray-700',
                              ]">
                                        <a class="flex items-center py-3 font-normal text-white" :href="href" @click="navigate">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                            </svg>
                                            organization
                                        </a>
                                    </li>
                                </router-link>



                            </ul>
                        </DisclosurePanel>
                    </Disclosure>
                </li>
                <li>
                    <Disclosure v-slot="{ open }" :default-open="isUserManagementActive">
                        <DisclosureButton class="flex items-center w-full px-4 py-3 shadow-md hover:bg-gray-700" :class="open ? 'bg-gray-700' : ''">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 text-lime-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                            </svg>

                            Messages
                            <span class="ml-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="open ? 'transform rotate-90' : ''">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </DisclosureButton>
                        <DisclosurePanel>
                            <ul>
                                <router-link v-if="currentUser" v-slot="{ isExactActive, href, navigate }" :to="{ name: 'inbox' }" custom>
                                    <li class="pl-12" :class="[
                                isExactActive
                                  ? 'bg-gray-500 text-white'
                                  : 'hover:bg-gray-700',
                              ]">
                                        <a class="flex items-center py-3 font-normal text-white" :href="href" @click="navigate">

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 text-neutral-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                                            </svg>

                                            Inbox Messages
                                        </a>
                                    </li>
                                </router-link>

                                <router-link v-if="currentUser" v-slot="{ isExactActive, href, navigate }" :to="{ name: 'outbox' }" custom>
                                    <li class="pl-12" :class="[
                                isExactActive
                                  ? 'bg-gray-500 text-white'
                                  : 'hover:bg-gray-700',
                              ]">
                                        <a class="flex items-center py-2 font-normal text-white" :href="href" @click="navigate">

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 text-neutral-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                                            </svg>

                                            Outbox Messages
                                        </a>
                                    </li>
                                </router-link>

                                <router-link v-if="currentUser" v-slot="{ isExactActive, href, navigate }" :to="{ name: 'bulklist' }" custom>
                                    <li class="pl-12" :class="[
                                isExactActive
                                  ? 'bg-gray-500 text-white'
                                  : 'hover:bg-gray-700',
                              ]">
                                        <a class="flex items-center py-3 font-normal text-white" :href="href" @click="navigate">

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 text-neutral-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                            </svg>

                                            Bulk Messages
                                        </a>
                                    </li>
                                </router-link>

                            </ul>
                        </DisclosurePanel>
                    </Disclosure>
                </li>

                <li>
                    <Disclosure v-slot="{ open }" :default-open="isUserManagementActive">
                        <DisclosureButton class="flex items-center w-full px-4 py-3 hover:bg-gray-700" :class="open ? 'bg-gray-700' : ''">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 text-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                            </svg>
                            Sms Traffic
                            <span class="ml-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="open ? 'transform rotate-90' : ''">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </DisclosureButton>
                        <DisclosurePanel>
                            <ul>
                                <router-link v-if="currentUser" v-slot="{ isExactActive, href, navigate }" :to="{ name: 'contents' }" custom>
                                    <li class="pl-12" :class="[
                                isExactActive
                                  ? 'bg-gray-500 text-white'
                                  : 'hover:bg-gray-700',
                              ]">
                                        <a class="flex items-center py-3 font-normal text-white" :href="href" @click="navigate">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 text-neutral-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                            </svg>
                                            sms content
                                        </a>
                                    </li>
                                </router-link>

                                <router-link v-if="currentUser" v-slot="{ isExactActive, href, navigate }" :to="{ name: 'shortcodes' }" custom>
                                    <li class="pl-12" :class="[
                                isExactActive
                                  ? 'bg-gray-500 text-white'
                                  : 'hover:bg-gray-700',
                              ]">
                                        <a class="flex items-center py-3 font-normal text-white" :href="href" @click="navigate">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 text-neutral-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                            </svg>
                                            Sms Shortcode
                                        </a>
                                    </li>
                                </router-link>

                                <router-link v-if="currentUser" v-slot="{ isExactActive, href, navigate }" :to="{ name: 'subscriptions' }" custom>
                                    <li class="pl-12" :class="[
                                isExactActive
                                  ? 'bg-gray-500 text-white'
                                  : 'hover:bg-gray-700',
                              ]">
                                        <a class="flex items-center py-3 font-normal text-white" :href="href" @click="navigate">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 text-neutral-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                            </svg>
                                            Sms Subscription
                                        </a>
                                    </li>
                                </router-link>

                                <!-- <router-link v-if="currentUser" v-slot="{ isExactActive, href, navigate }" :to="{ name: 'list-debt-Work' }" custom>
                                    <li class="pl-12" :class="[
                                isExactActive
                                  ? 'bg-gray-500 text-white'
                                  : 'hover:bg-gray-700',
                              ]">
                                        <a class="flex items-center py-3 font-normal text-white" :href="href" @click="navigate">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 text-neutral-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                            </svg>
                                            Debt Activity
                                        </a>
                                    </li>
                                </router-link> -->

                                <!-- <router-link v-if="currentUser" v-slot="{ isExactActive, href, navigate }" :to="{ name: 'category' }" custom>
                                    <li class="pl-12" :class="[
                                isExactActive
                                  ? 'bg-gray-500 text-white'
                                  : 'hover:bg-gray-700',
                              ]">
                                        <a class="flex items-center py-3 font-normal text-white" :href="href" @click="navigate">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 text-neutral-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                            </svg>
                                            Category
                                        </a>
                                    </li>
                                </router-link> -->

                                <!-- <router-link v-if="currentUser" v-slot="{ isExactActive, href, navigate }" :to="{ name: 'product' }" custom>
                                    <li class="pl-12" :class="[
                                isExactActive
                                  ? 'bg-gray-500 text-white'
                                  : 'hover:bg-gray-700',
                              ]">
                                        <a class="flex items-center py-3 font-normal text-white" :href="href" @click="navigate">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 text-neutral-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                            </svg>
                                            Product Products
                                        </a>
                                    </li>
                                </router-link> -->

                            </ul>
                        </DisclosurePanel>
                    </Disclosure>
                </li>
                <!-- <router-link href="#" :to="{ name: 'transaction' }" class="flex items-center py-3 text-white">
                    <li class="px-4 hover:bg-gray-700" >
                        <a class="flex items-center py-3 font-normal text-white" :href="href" @click="navigate">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </svg>
                            Reports
                        </a>

                    </li>
                </router-link> -->

                <li v-if="this.currentUser.roles.includes('UPDATE_PRIVILEGE') && this.currentUser.roles.includes('DELETE_PRIVILEGE') && this.currentUser.roles.includes('CREATE_PRIVILEGE')" class="px-4 cursor-pointer hover:bg-gray-700">
                    <a href="#" class="flex items-center py-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Messages
                        <span class="px-2 py-1 ml-auto text-xs bg-gray-500 rounded-sm">16</span>
                    </a>
                </li>

                <li v-if="this.currentUser.roles.includes('UPDATE_PRIVILEGE') && this.currentUser.roles.includes('DELETE_PRIVILEGE') && this.currentUser.roles.includes('CREATE_PRIVILEGE')" class="px-4 cursor-pointer hover:bg-gray-700">
                    <a href="#" class="flex items-center py-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Calendar
                    </a>
                </li>

                <li v-if="this.currentUser.roles.includes('UPDATE_PRIVILEGE') && this.currentUser.roles.includes('CREATE_PRIVILEGE')" class="px-4 cursor-pointer hover:bg-gray-700">
                    <router-link :to="{ name: 'card' }" class="flex items-center py-2 text-white">
                        <svg class="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z" fill="currentColor" />
                            <path d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z" fill="currentColor" />
                            <path d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z" fill="currentColor" />
                            <path d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z" fill="currentColor" />
                        </svg>
                        Card
                    </router-link>
                </li>

                <li v-if="this.currentUser.roles.includes('UPDATE_PRIVILEGE') &&  this.currentUser.roles.includes('CREATE_PRIVILEGE')" class="px-4 cursor-pointer hover:bg-gray-700">
                    <router-link :to="{ name: 'card' }" class="flex items-center py-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        Product
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>

</div>
</template>

<script>
import {
    computed
} from "vue";
import {
    useRoute
} from "vue-router";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel
} from "@headlessui/vue";
import store from "@/store";
import {
    mapState
} from "vuex";
// import EventBus from "./common/EventBus";
export default {
    components: {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
    },
    data() {
        return {
            toggleBar: false,
        };
    },

    setup() {
        const route = useRoute();

        const isUserManagementActive = computed(() => {
            const names = ["user-list", "user-detail", "roles", "permissions"];

            return names.includes(route.name);
        });

        const isUserActive = computed(() => {
            const names = ["user-list", "user-detail"];

            return names.includes(route.name);
        });

        return {
            route,
            isUserManagementActive,
            isUserActive,
        };
    },
    computed: {
        ...mapState(["sideBarOpen"]),
        currentUser() {
            return store.state.user;
        },
        showAdminBoard() {
            if (this.currentUser && this.currentUser['roles']) {
                return this.currentUser['roles'].includes('ROLE_ADMIN');
            }

            return false;
        },
        showModeratorBoard() {
            if (this.currentUser && this.currentUser['roles']) {
                return this.currentUser['roles'].includes('ROOT_PRIVILEGE');
            }

            return false;
        },
        showManageContentPrivilege() {
            if (this.currentUser && this.currentUser['roles']) {
                return this.currentUser['roles'].includes('MANAGE_CONTENT_PRIVILEGE');
            }
            return false;
        },
        showManageInboxPrivilege() {
            if (this.currentUser && this.currentUser['roles']) {
                return this.currentUser['roles'].includes('MANAGE_INBOX_PRIVILEGE');
            }
            return false;
        },
        showManageUserPrivilege() {
            if (this.currentUser && this.currentUser['roles']) {
                return this.currentUser['roles'].includes('MANAGE_USER_PRIVILEGE');
            }
            return false;
        },
        showExecutePrivilege() {
            if (this.currentUser && this.currentUser['roles']) {
                return this.currentUser['roles'].includes('EXECUTE_PRIVILEGE');
            }
            return false;
        },
        showWritePrivilege() {
            if (this.currentUser && this.currentUser['roles']) {
                return this.currentUser['roles'].includes('WRITE_PRIVILEGE');
            }
            return false;
        },
        showReadPrivilege() {
            if (this.currentUser && this.currentUser['roles']) {
                return this.currentUser['roles'].includes('READ_PRIVILEGE');
            }
            return false;
        },
        showManageOrganizationsPrivilege() {
            if (this.currentUser && this.currentUser['roles']) {
                return this.currentUser['roles'].includes('MANAGE_ORGANIZATIONS_PRIVILEGE');
            }
            return false;
        },

    },
    methods: {
        // logOut() {
        //   this.$store.dispatch('auth/logout');
        //   this.$router.push('/');
        // },
        hasRootPrivilege(user) {
            return user.roles.includes('ROOT_PRIVILEGE');
        }
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push({
                name: "login",
            });
        }
    },
    //     beforeUnmount() {
    //     EventBus.remove("logout");
    //   }
};
</script>
