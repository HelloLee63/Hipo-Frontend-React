export function InvariantContext (contextName) {
    return new Proxy(
        {},
        {
            get: function(target, name) {
                return undefined;
            },
        },
    )
}