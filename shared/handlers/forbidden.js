module.exports = (ctx) => {
    ctx.status = 403;
    ctx.body = 'This user does not have permission to delete an user.';
}