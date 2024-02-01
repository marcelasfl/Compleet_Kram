convertCase() {
  local name="$1"
  local divider="${2:-_}"
  echo "$name" | sed -E "s/([a-z0-9])([A-Z])/\1${divider}\L\2/g" | sed "s/^${divider}//" | tr '[:upper:]' '[:lower:]'
}

convertToUpper() {
  local name="$1"
  echo $(echo "$name" | tr '[:lower:]' '[:upper:]')
}

DEFAULT_ENTITY_NAME="Exame"
DEFAULT_ENTITY_NAME_SNAKE=$(convertCase $DEFAULT_ENTITY_NAME "-")
DEFAULT_ENTITY_NAME_SNAKE_UPPER=$(convertToUpper "$(convertCase $DEFAULT_ENTITY_NAME)")

ENTITY=$1
ENTITY_SNAKE=$(convertCase $ENTITY "-")
ENTITY_SNAKE_UPPER=$(convertToUpper "$(convertCase $ENTITY)")


rename() {
  local FILE_PATH="$1"
  sed -i "s/${DEFAULT_ENTITY_NAME}/${ENTITY}/g" $FILE_PATH
  sed -i "s/${DEFAULT_ENTITY_NAME_SNAKE}/${ENTITY_SNAKE}/g" $FILE_PATH
  sed -i "s/${DEFAULT_ENTITY_NAME_SNAKE_UPPER}/${ENTITY_SNAKE_UPPER}/g" $FILE_PATH
}



# ____________________________ Query Hook ____________________________
QUERY_HOOK_DIR="src/hooks/Querys"
DEFAULT_QUERY_PATH="$QUERY_HOOK_DIR/use${DEFAULT_ENTITY_NAME}Query.ts"
NEW_QUERY_PATH="$QUERY_HOOK_DIR/use${ENTITY}Query.ts"

# Criar hook do react query
cp $DEFAULT_QUERY_PATH $NEW_QUERY_PATH
rename $NEW_QUERY_PATH

# ____________________________ Query Hook Mutation ____________________________
MUTATION_HOOK_DIR="src/hooks/Mutations"
DEFAULT_MUTATION_PATH="$MUTATION_HOOK_DIR/use${DEFAULT_ENTITY_NAME}Mutation.ts"
NEW_MUTATION_PATH="$MUTATION_HOOK_DIR/use${ENTITY}Mutation.ts"

# Criar mutation hook
cp $DEFAULT_MUTATION_PATH $NEW_MUTATION_PATH
rename $NEW_MUTATION_PATH

# ____________________________ validation ____________________________

VALIDATION_DIR="src/validations"
VALIDATION_DEFAULT_QUERY_PATH="$VALIDATION_DIR/$DEFAULT_ENTITY_NAME_SNAKE.validations.ts"
NEW_VALIDATION_PATH="$VALIDATION_DIR/$ENTITY_SNAKE.validations.ts"

cp $VALIDATION_DEFAULT_QUERY_PATH $NEW_VALIDATION_PATH
rename $NEW_VALIDATION_PATH


# ____________________________ LIST ____________________________
LIST_PAGE_PATH="src/app/dashboard"

LIST_PAGE_DEFAULT_PATH="$LIST_PAGE_PATH/$DEFAULT_ENTITY_NAME_SNAKE/page.tsx"
NEW_LIST_PAGE_PATH="$LIST_PAGE_PATH/$ENTITY_SNAKE/page.tsx"


mkdir -p $LIST_PAGE_PATH/$ENTITY_SNAKE
cp $LIST_PAGE_DEFAULT_PATH $NEW_LIST_PAGE_PATH
rename $NEW_LIST_PAGE_PATH


# ____________________________ ADD ____________________________

ADD_PAGE_DEFAULT_PATH="$LIST_PAGE_PATH/$DEFAULT_ENTITY_NAME_SNAKE/add/page.tsx"
NEW_ADD_PAGE_PATH="$LIST_PAGE_PATH/$ENTITY_SNAKE/add/page.tsx"


mkdir -p "$LIST_PAGE_PATH/$ENTITY_SNAKE/add"
cp $ADD_PAGE_DEFAULT_PATH $NEW_ADD_PAGE_PATH
rename $NEW_ADD_PAGE_PATH

# ____________________________ EDIT ____________________________

EDIT_PAGE_DEFAULT_PATH="$LIST_PAGE_PATH/$DEFAULT_ENTITY_NAME_SNAKE/edit/[id]/page.tsx"
NEW_EDIT_PAGE_PATH="$LIST_PAGE_PATH/$ENTITY_SNAKE/edit/[id]/page.tsx"


mkdir -p "$LIST_PAGE_PATH/$ENTITY_SNAKE/edit/[id]"
cp $EDIT_PAGE_DEFAULT_PATH $NEW_ADD_PAGE_PATH
rename $NEW_ADD_PAGE_PATH

# ____________________________ FORM  ____________________________

FORM_PAGE_DEFAULT_PATH="src/components/Forms/use${DEFAULT_ENTITY_NAME}Form.tsx"
NEW_FORM_PAGE_PATH="src/components/Forms/use${ENTITY}Form.tsx"


cp $FORM_PAGE_DEFAULT_PATH $NEW_FORM_PAGE_PATH
rename $NEW_FORM_PAGE_PATH

