import db from './fireBase.js'
import { collection, getDocs } from 'firebase/firestore';

export async function getWorkspaces() {
    const workspaceCol = collection(db, 'workspaces');
    const workspaceSnapshot = await getDocs(workspaceCol);
    const workspaceList = workspaceSnapshot.docs.map(doc => doc.data());
    return workspaceList;
}

