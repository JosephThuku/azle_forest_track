// import the azle library
import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt, Variant, text } from 'azle';
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

const Errors = Variant({
    InvalidInput: text
});
type Errors = typeof Errors.tsType;

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
export function getTree(id: string): Result<Tree, Errors> {
    return match(treeStorage.get(id), {
        Some: (tree) => Result.Ok(tree),
        None: () => Result.Err({InvalidInput: `a tree with id=${id} not found`})
    });
}

// create the addTree update
$update;
export function addTree(payload: TreePayload): Result<Tree, Errors> {
    if(!payload.species ||
        !payload.diameter ||
        !payload.length){
            return Result.Err({InvalidInput: "Input fields cannot be empty."})
        }
    const tree: Tree = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    treeStorage.insert(tree.id, tree);
    return Result.Ok(tree);
}

// create the updateTree update
$update;
export function updateTree(id: string, payload: TreePayload): Result<Tree, Errors> {
    if(!payload.species ||
        !payload.diameter ||
        !payload.length){git add
            return Result.Err({InvalidInput: "Input fields cannot be empty."})
        }
    return match(treeStorage.get(id), {
        Some: (tree) => {
            const updatedTree: Tree = {...tree, ...payload, updatedAt: Opt.Some(ic.time())};
            treeStorage.insert(tree.id, updatedTree);
            return Result.Ok(updatedTree);
        },
        None: () => Result.Err({InvalidInput: `couldn't update a tree with id=${id}. tree not found`})
    });
}

// create the deleteTree update
$update;
export function deleteTree(id: string): Result<Tree, Errors> {
    return match(treeStorage.remove(id), {
        Some: (deletedTree) => Result.Ok(deletedTree),
        None: () => Result.Err({InvalidInput: `couldn't delete a tree with id=${id}. tree not found.`})
    });
}

// create the getTimbers by id query
$query;
export function getTimbers(): Result<Vec<Timber>, string> {
    return Result.Ok(timberStorage.values());
}

// create the getTimber by id query
$query;
export function getTimber(id: string): Result<Timber, Errors> {
    return match(timberStorage.get(id), {
        Some: (timber) => Result.Ok(timber),
        None: () => Result.Err({InvalidInput: `a timber with id=${id} not found`})
    });
}

// create the addTimber update
$update;
export function addTimber(payload: TimberPayload): Result<Timber, string> {
    if(!payload.treeId ||
        !payload.merchantId ||
        !payload.price ||
        !payload.status){
            return Result.Err({InvalidInput: "Input fields cannot be empty."})
        }
    const timber: Timber = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    timberStorage.insert(timber.id, timber);
    return Result.Ok(timber);
}

// create the updateTimber update
$update;
export function updateTimber(id: string, payload: TimberPayload): Result<Timber, Errors> {
    if(!payload.treeId ||
        !payload.merchantId ||
        !payload.price ||
        !payload.status){
            return Result.Err({InvalidInput: "Input fields cannot be empty."})
        }
    return match(timberStorage.get(id), {
        Some: (timber) => {
            const updatedTimber: Timber = {...timber, ...payload, updatedAt: Opt.Some(ic.time())};
            timberStorage.insert(timber.id, updatedTimber);
            return Result.Ok(updatedTimber);
        },
        None: () => Result.Err({InvalidInput: `couldn't update a timber with id=${id}. timber not found`})
    });
}

// create the deleteTimber update
$update;
export function deleteTimber(id: string): Result<Timber, Errors> {
    return match(timberStorage.remove(id), {
        Some: (deletedTimber) => Result.Ok(deletedTimber),
        None: () => Result.Err({InvalidInput: `couldn't delete a timber with id=${id}. timber not found.`})
    });
}

//export the tree and timber types
export type { Tree, Timber, TreePayload, TimberPayload };
