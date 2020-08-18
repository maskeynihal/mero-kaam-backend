export const index = (req, res) => {
  res.status(200).json({
    data: {
      todos: [
        {
          title: 'My first TODO',
          description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni sit quibusdam eveniet, nostrum consequatur amet tempore autem iusto dolorum ea veritatis consectetur temporibus veniam quos repellat. Neque architecto animi voluptatum?'
        }
      ]
    }
  });
};
