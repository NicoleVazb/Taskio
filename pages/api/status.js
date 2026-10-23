function status(request, response) {
    response.status(200).send({ status: 'ok' });
}

export default status;