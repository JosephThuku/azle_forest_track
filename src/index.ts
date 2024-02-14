// import the azle library
import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';

// define the tree record
type Tree = Record<{
    id: string;
    species: string;
    diameter: number;
    length: number;
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

// define the tree payload
type TreePayload = Record<{
    species: string;
    diameter: number;
    length: number;
}>

// define the timber record
type Timber = Record<{
    id: string;
    treeId: string;
    merchantId: string;
    price: number;
    status: string;
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

// define the timber payload
type TimberPayload = Record<{
    treeId: string;
    merchantId: string;
    price: number;
    status: string;
}>

// create the tree storage
const treeStorage = new StableBTreeMap<string, Tree>(0, 44, 1024);

// create the timber storage
const timberStorage = new StableBTreeMap<string, Timber>(0, 44, 1024);

// create the getTrees query
$query;
export function getTrees(): Result<Vec<Tree>, string> {
    return Result.Ok(treeStorage.values());
}

// create the getTree query
$query;
export function getTree(id: string): Result<Tree, string> {
    return match(treeStorage.get(id), {
        Some: (tree) => Result.Ok<Tree, string>(tree),
        None: () => Result.Err<Tree, string>(`a tree with id=${id} not found`)
    });
}

// create the addTree update
$update;
export function addTree(payload: TreePayload): Result<Tree, string> {
    const tree: Tree = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    treeStorage.insert(tree.id, tree);
    return Result.Ok(tree);
}

// create the updateTree update
$update;
export function updateTree(id: string, payload: TreePayload): Result<Tree, string> {
    return match(treeStorage.get(id), {
        Some: (tree) => {
            const updatedTree: Tree = {...tree, ...payload, updatedAt: Opt.Some(ic.time())};
            treeStorage.insert(tree.id, updatedTree);
            return Result.Ok<Tree, string>(updatedTree);
        },
        None: () => Result.Err<Tree, string>(`couldn't update a tree with id=${id}. tree not found`)
    });
}

// create the deleteTree update
$update;
export function deleteTree(id: string): Result<Tree, string> {
    return match(treeStorage.remove(id), {
        Some: (deletedTree) => Result.Ok<Tree, string>(deletedTree),
        None: () => Result.Err<Tree, string>(`couldn't delete a tree with id=${id}. tree not found.`)
    });
}

// create the getTimbers by id query
$query;
export function getTimbers(): Result<Vec<Timber>, string> {
    return Result.Ok(timberStorage.values());
}

// create the getTimber by id query
$query;
export function getTimber(id: string): Result<Timber, string> {
    return match(timberStorage.get(id), {
        Some: (timber) => Result.Ok<Timber, string>(timber),
        None: () => Result.Err<Timber, string>(`a timber with id=${id} not found`)
    });
}

// create the addTimber update
$update;
export function addTimber(payload: TimberPayload): Result<Timber, string> {
    const timber: Timber = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    timberStorage.insert(timber.id, timber);
    return Result.Ok(timber);
}

// create the updateTimber update
$update;
export function updateTimber(id: string, payload: TimberPayload): Result<Timber, string> {
    return match(timberStorage.get(id), {
        Some: (timber) => {
            const updatedTimber: Timber = {...timber, ...payload, updatedAt: Opt.Some(ic.time())};
            timberStorage.insert(timber.id, updatedTimber);
            return Result.Ok<Timber, string>(updatedTimber);
        },
        None: () => Result.Err<Timber, string>(`couldn't update a timber with id=${id}. timber not found`)
    });
}

// create the deleteTimber update
$update;
export function deleteTimber(id: string): Result<Timber, string> {
    return match(timberStorage.remove(id), {
        Some: (deletedTimber) => Result.Ok<Timber, string>(deletedTimber),
        None: () => Result.Err<Timber, string>(`couldn't delete a timber with id=${id}. timber not found.`)
    });
}

//export the tree and timber types
export type { Tree, Timber, TreePayload, TimberPayload };
