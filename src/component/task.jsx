import { Dialog, Transition } from "@headlessui/react"
import { BookmarkIcon, CalendarIcon, CheckCircleIcon, ClockIcon, InboxIcon, LinkIcon, LocationMarkerIcon, UsersIcon } from "@heroicons/react/solid"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { Fragment, useRef, useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { db } from "../config/firebaseConfig"

export default function Task(props) {

    const isDragging = props.isDragging

    const navigation = [
        { name: 'Labels', href: '#', icon: BookmarkIcon, current: false, isClick: 2 },
        { name: 'Checklist', href: '#', icon: CheckCircleIcon, current: false, isClick: 3 },
        { name: 'Dates', href: '#', icon: ClockIcon, current: false, isClick: 4 },
        { name: 'Attachment', href: '#', icon: LinkIcon, current: false, isClick: 5 },
        { name: 'Location', href: '#', icon: LocationMarkerIcon, current: false, isClick: 6 },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const className = isDragging ? "border drop-shadow-xl rounded-md p-8 mb-8 transition-colors delay-200 ease-linear bg-green-400" :
        "border drop-shadow-xl rounded-md p-8 mb-8 transition-colors delay-200 ease-linear bg-white"
    const [open, setOpen] = useState(false)
    
    const cancelButtonRef = useRef(null);
    const [title, setTitle] = useState(props.task.title)
    const [desc, setDesc] = useState()

    function getCardDetail(cardID) {
        console.log(cardID);
        const q = query(collection(db, "cards"), where("id", "==", cardID))
        onSnapshot(q, (doc) => {
            console.log(doc.docs[0].data());
            const { id, title, description } = doc.docs[0].data()
            setTitle(title)
            setDesc(description)
        })
    }

    return (
        <div>
            <div onClick={() => {
                setOpen(true)
                getCardDetail(props.task.id)
            }}>
                <Draggable
                    draggableId={props.task.id}
                    index={props.index}>
                    {(provided, snapshot) => (
                        <div className={className}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}>
                            {props.task.title}
                        </div>
                    )}
                </Draggable>
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                >
                    <div
                        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div
                                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            >
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left pr-32">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Card Title
                                            </Dialog.Title>
                                            <textarea className="text-lg " name="title" id="title" rows="1" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Card Description
                                            </Dialog.Title>
                                            <textarea className="text-lg " name="title" id="title" rows="1" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                                        </div>
                                        <div className="inset-y-0 right-0">
                                            <h5>Add to card</h5>
                                            {navigation.map((item) => (
                                                <div className="py-1">
                                                    <button
                                                        key={item.name}
                                                        href={item.href}
                                                        className={classNames('bg-gray-200 text-black hover:bg-gray-300',
                                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                                        )}
                                                        onClick={() => console.log("lo")}
                                                    >
                                                        <item.icon
                                                            className='text-black mr-3 h-6 w-6'
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="bg-transparent border-0 text-black absolute top-3 right-3"
                                            onClick={() => setOpen(false)}>
                                            ✖
                                        </button>
                                    </div>
                                    <button>Save</button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}